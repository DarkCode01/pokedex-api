import { Gender } from '@app/gender/gender.providers'

declare global {
  interface IGenderService {
    getOrCreateGender(genderName: string): Promise<Gender>
  }
}
