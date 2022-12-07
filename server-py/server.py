import os
from flask import (
    Flask, 
    jsonify,
    flash,
    request,
    redirect,
    abort
)
from werkzeug.utils import secure_filename
import cv2

UPLOAD_FOLDER = 'fingerprints'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'BMP'}

def get_fingerprint_match_score():
    fingerprint1 = cv2.imread(
        "fingerprints/fingerprint_1.jpeg"
    )
    fingerprint2 = cv2.imread(
        "fingerprints/fingerprint_2.jpeg"
    )
    match_score  = 0

    sift = cv2.SIFT_create()
    keypoints_1, des1 = sift.detectAndCompute(fingerprint1, None)
    keypoints_2, des2 = sift.detectAndCompute(fingerprint2, None)

    # KNN matching
    matches = cv2.FlannBasedMatcher({"algorithm": 1, "trees": 10}, {}).knnMatch(
        des1, des2, k=2
    )

    match_points = []
    for p, q in matches:
        if p.distance < 0.1 * q.distance:
            match_points.append(p)

    keypoints = 0
    if len(keypoints_1) <= len(keypoints_2):
        keypoints = len(keypoints_1)
    else:
        keypoints = len(keypoints_2)
    match_score = len(match_points) / keypoints * 100
    return match_score

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def store_fingerprint_images(app, file, idx):
    if file.filename == '':
        flash('No selected file')
        return redirect(request.url)
    if file and allowed_file(file.filename):
        # filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], "fingerprint_{no}.jpeg".format(no=idx+1)))

# Function that create the app 
def create_app(test_config=None ):
    # create and configure the app
    app = Flask(__name__)
    app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
    app.config['SECRET_KEY'] = 'dev'

    # Simple route
    @app.route('/')
    def home(): 
        return jsonify({
           "status": "success",
        })

    @app.route('/verify/fingerprint', methods=['GET', 'POST'])
    def verify_fingerprint():
        if request.method == 'POST':
            app.logger.info(request.files.getlist('file'))
            # check if the post request has the file part
            if 'file' not in request.files:
                flash('No file part')
                abort(400)
            # log files;
            upload_files = request.files.getlist('file')
            app.logger.info(upload_files)
            for idx, file in enumerate(upload_files):
                store_fingerprint_images(app, file, idx)

            match_score = get_fingerprint_match_score()
            for idx in range(2):
                os.remove(os.path.join(app.config['UPLOAD_FOLDER'], "fingerprint_{no}.jpeg".format(no=idx+1)))
            # If the user does not select a file, the browser submits an
            # empty file without a filename.
            flash('done')
            return  jsonify({
                "status": "success",
                "message": "Verification completed successfully",
                "match_score": match_score
            })
     
    return app # do not forget to return the app

APP = create_app()

if __name__ == '__main__':
    APP.run(host='0.0.0.0', port=5050, debug=True)
    # APP.run(debug=True)