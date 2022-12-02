// @ts-nocheck
// require('../modules/WebSdk');

// const { FingerprintReader, SampleFormat } = require('@digitalpersona/devices');
import { FingerprintReader, SampleFormat } from '@digitalpersona/devices';


class FingerprintSigninControl
{
    async init() {
        console.log('init was called');
        this.reader = new FingerprintReader();
        this.reader.on("DeviceConnected", this.onDeviceConnected);
        this.reader.on("DeviceDisconnected", this.onDeviceDisconnected);
        this.reader.on("QualityReported", this.onQualityReported);
        this.reader.on("SamplesAcquired", this.onSamplesAcquired);
        this.reader.on("ErrorOccurred", this.onReaderError);

        try {
            await this.reader.startAcquisition(SampleFormat.Intermediate);
        } catch (err) {
            this.handleError(err);
        }
    }
    
    onDeviceConnected = (event) => { 
        console.log("Device connected");
     }
    onDeviceDisconnected = (event) => {
        console.log("Device disconnected");
     };
    onQualityReported = (event) => { 
        console.log("Quality reported");
     };
    onSamplesAcquired = (event) => { 
        console.log("Samples acquired");
        try {
            const samples = event.samples;
            console.log('Samples have been acquired => ', samples);
        }
        catch (error) {
            this.handleError(error);
        }
     };
    onReaderError = (event) => { 
        console.log("Reader error");
    };
    handleError = (err) => {
        console.error('An error occurred while trying to initialize reader: ', err)
    }

    destroy = () => {
        this.reader.off();
        delete this.reader
    };
}

export default FingerprintSigninControl;