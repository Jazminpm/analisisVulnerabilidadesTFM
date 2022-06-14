import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable()
export class AppConfig {

  private config: Object | null = null;
  private env:    Object | null = null;

  constructor(private http: HttpClient) {}

  /**
   * Use to get the data found in the second file (config file)
   */
  public getConfig(key: any) {
    // @ts-ignore
    return this.config[key];
  }

  /**
   * Use to get the data found in the first file (env file)
   */
  public getEnv(key: any) {
    // @ts-ignore
    return this.env[key];
  }

  /**
   * This method:
   *   a) Loads "env.json" to get the current working environment (e.g.: 'production', 'development')
   *   b) Loads "config.[env].json" to get all env's variables (e.g.: 'config.development.json')
   */
  public load() {
    return new Promise((resolve, reject) => {
      this.http.get('assets/env.json').pipe(
        map(res => res)
      ).subscribe( (envResponse) => {
        // @ts-ignore
        this.env = envResponse.env;
        let request:any = null;

        switch (this.env) {
          case 'production': {
            request = this.http.get('assets/config.' + this.env + '.json');
          } break;

          case 'development': {
            request = this.http.get('assets/config.' + this.env + '.json');
          } break;

          case 'default': {
            console.error('Environment file is not set or invalid');
            resolve(true);
          } break;
        }

        if (request) {
          // @ts-ignore
          request.pipe(map(res => res)).subscribe((responseData) => {
              this.config = responseData;
              resolve(true);
            });
        } else {
          console.error('Env config file "env.json" is not valid');
          resolve(true);
        }
      });

    });
  }
}
