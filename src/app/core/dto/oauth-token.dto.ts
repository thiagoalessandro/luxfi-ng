import {SegUsuarioModel} from '../../shared/models/seg-usuario.model';

export class OauthTokenDto {

  public access_token: string;
  public token_type: string;
  public refresh_token: string;
  public expires_in: string;
  public scope: string;
}
