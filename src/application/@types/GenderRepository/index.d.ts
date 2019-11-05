import { Gender } from '@app/gender/gender.providers'

declare global {
  interface IGenderRepository {
    create(gender: any): Promise<Gender>

    getGenderByName(name: string): Promise<Gender|undefined>

    saveGender(gender: Gender): Promise<Gender>
  }
}
