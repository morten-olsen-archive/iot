import axios from 'axios';
import jwkToPem from 'jwk-to-pem';
import jwt, { JwtHeader, SigningKeyCallback } from 'jsonwebtoken';

class JwksContext {
  private _uri: string;
  private _keys: any;

  constructor(uri: string) {
    this._uri = uri;
  }

  private _getKey = async (header: JwtHeader, callback: SigningKeyCallback) => {
    if (!header.kid) {
      return callback(new Error('No kid in JWT header'));
    }
    if (!this._keys) {
      const { data: keys } = await axios.get(this._uri);
      this._keys = keys.keys;
    }
    const key = this._keys.find((k: any) => k.kid === header.kid);
    if (!key) {
      return callback(new Error('kid not in jwks'));
    }
    return callback(undefined, jwkToPem(key));
  };

  public getData = (token: string) =>
    new Promise((resolve, reject) => {
      jwt.verify(token, this._getKey, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
}

export default JwksContext;
