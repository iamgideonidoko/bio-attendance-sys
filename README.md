# Biometric Attendance System

This biometric attendance system is a time and attendance tracking system that allows staff or teachers to organize courses, manage students and mark students' attendance using their most unique physical characteristics—their fingerprints. It's built with computer vision (Python OpenCV), Flask and the MERN stack.

**NB**: This system has been built and tested with The DigitalPersona U.are.U 4500 scanner only. It only supports Windows OS for now.

Below is an image of a DigitalPersona U.are.U 4500 scanner
![DigitalPersona U.are.U 4500 scanner](./screenshots/digitalpersona_scanner_full.jpg)

Download and install the client for windows here: [HID DigitalPersona Client](https://drive.google.com/file/d/12QCh311WQ-_PIkMHeXqNRfTkbIWnnSdY/view?usp=sharing)

## Project Structure

The project is divided into three sections:

1. `client` (frontend)
2. `server` (core backend)
3. `server-py` (matching backend)

## Getting Started

Follow the steps below to set up the project locally

1.  Clone repo:

  ```bash
  [HTTPS] - git clone git@github.com:IamGideonIdoko/bio-attendance-sys.git
  [SSH] - git clone https://github.com/IamGideonIdoko/bio-attendance-sys.git
  ```

2. Install `client` dependencies:

  ```bash
  make client-deps
  ```

3. Install `server` dependencies:

  ```bash
  make server-deps
  ```

4. Install `server-py` dependencies

    i. Create a conda environment

     ```bash
     make conda-env
     ```

    ii. Activate created conda environment

     ```bash
     conda activate bas_env
     ```

    iii. Install dependencies

     ```bash
     make match-server-deps
     ```

5. Create a MySQL database (eg. `bioattendancesysdb`)

6. Set up `.env` in `server` and update with neccessary details

  ```bash
  make core-server-env
  ```

7. Run DB migration

  ```bash
  make dev-migrate
  ```

8. Run DB migration

  ```bash
  make dev-migrate
  ```

9. In a new terminal, start `server`

  ```bash
  make core-server
  ```

10. In a conda activated `bas_env` environment terminal, start `server-py`

  ```bash
  make match-server
  ```

11. In a new terminal, start `client`

  ```bash
  make client-server
  ```

## Project DB ERD
![Entity Relationship Diagram](./server/prisma/diagrams/ERD-auto.svg)

## Screenshots
![Screenshot of system 1](./screenshots/bas_screenshot_1.JPG)

![Screenshot of system 2](./screenshots/bas_screenshot_2.JPG)

![Screenshot of system 3](./screenshots/bas_screenshot_3.JPG)

![Screenshot of system 4](./screenshots/bas_screenshot_4.JPG)

![Screenshot of system 5](./screenshots/bas_screenshot_5.JPG)

![Screenshot of system 6](./screenshots/bas_screenshot_6.JPG)

![Screenshot of system 7](./screenshots/bas_screenshot_7.JPG)

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.


## Author

Gideon Idoko - [@IamGideonIdoko](https://twitter.com/IamGideonIdoko) - iamgideonidoko@gmail.com
