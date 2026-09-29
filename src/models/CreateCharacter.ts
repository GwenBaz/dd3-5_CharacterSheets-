export interface CreateCharacter {
  name: string
  classe: string
  race: string
  level: number
}

export const makeCharacter = (
  name: string,
  classe: string,
  race: string,
  level = 1
): CreateCharacter => ({ name, classe, race, level })

export default CreateCharacter
