// require('../modules/WebSdk');

import { Event, FingerprintReader, SampleFormat } from '@digitalpersona/devices';
import type { Handler } from '@digitalpersona/devices/dist/typings/private';

interface IFingerprintControl {
  reader: FingerprintReader | null;
  onDeviceConnected: Handler<Event>;
  onDeviceDisconnected: Handler<Event>;
  onQualityReported: Handler<Event>;
  onSamplesAcquired: Handler<Event>;
  onReaderError: Handler<Event>;
  handleError: (err: unknown) => void;
}

class FingerprintControl implements IFingerprintControl {
  reader: FingerprintReader | null = null;
  async init() {
    console.log('init was called');
    this.reader = new FingerprintReader();
    this.reader.on('DeviceConnected', this.onDeviceConnected);
    this.reader.on('DeviceDisconnected', this.onDeviceDisconnected);
    this.reader.on('QualityReported', this.onQualityReported);
    this.reader.on('SamplesAcquired', this.onSamplesAcquired);
    this.reader.on('ErrorOccurred', this.onReaderError);

    try {
      // start acquisition of PNG images
      await this.reader.startAcquisition(SampleFormat.PngImage);
    } catch (err) {
      this.handleError(err);
    }
  }

  onDeviceConnected: Handler<Event> = (event) => console.log('Device connected: ', event);

  onDeviceDisconnected: Handler<Event> = (event) => console.log('Device disconnected: ', event);

  onQualityReported: Handler<Event> = (event) => console.log('Quality reported: ', event);

  onSamplesAcquired: Handler<unknown> = (event) =>
    console.log('Samples acquired: ', (event as { samples: string[] }).samples);

  onReaderError: Handler<Event> = (event) => console.error('Reader error: ', event);

  handleError = (error: unknown) => console.error('Could not initialize reader: ', error);

  destroy = () => {
    if (this.reader) {
      this.reader.off();
      this.reader = null;
    }
  };
}

export const fingerprintControl = new FingerprintControl();

export default FingerprintControl;
