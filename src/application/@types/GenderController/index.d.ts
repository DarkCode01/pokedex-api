import { Gender } from '@app/gender/gender.providers'

declare global {
  interface IGenderController {
    getOrCreateGender(name: string): Promise<Gender>
  }
}
