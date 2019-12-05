import { Injectable } from '@angular/core';
import Speech from 'speak-tts';

@Injectable({
  providedIn: 'root'
})
export class SpeechService {

  private lang = 'pt-BR';
  private voice = 'Google português do Brasil';

  public speech: Speech;
  public speaking: boolean;

  constructor() {
    this.speech = new Speech();
    this.speech
      .init({
        volume: 1,
        lang: this.lang,
        rate: 1.3,
        pitch: 0.7,
      })
      .then(data => console.log('Speech is ready', data))
      .catch(e => console.error('An error occured while initializing : ', e));
  }

  speak(text: string) {
    this.speech.setLanguage(this.lang);
    this.speech.setVoice(this.voice);
    // this.speaking = true;
    this.speech
      .speak({
        text,
        queue: true,
        listeners: {
          onstart: () => console.log('Start utterance'),
          onend: () => console.log('End utterance'),
          onresume: () => console.log('Resume utterance'),
          onboundary: event => console.log(`${event.name} boundary reached after ${event.elapsedTime} milliseconds.`)
        }
      })
      .then(data => {
        console.log('Success !', data);
        this.speaking = false;
      })
      .catch(e => {
        console.error('An error occurred :', e);
        this.speaking = false;
      });
  }

  pause() {
    this.speech.pause();
  }

  resume() {
    this.speech.resume();
  }

  convertMonetaryValue(value: number) {
    switch (this.lang) {
      case 'pt-BR':
        return `R$ ${value.toString().replace('.', ',')}`;
        break;
      default:
        return value;
    }
  }
}
