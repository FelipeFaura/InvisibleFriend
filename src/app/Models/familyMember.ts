export class FamilyMember {
  public id: string
  public name: string
  public assigned: boolean
  public picture: string
  public code: string
  public invisibleFriend: string
  public wishList: string[]
  constructor(
    id: string,
    name: string,
    assigned: boolean,
    picture: string,
    code: string,
    invisibleFriend: string,
    wishList: string[]
  ) {
    this.id = id
    this.name = name
    this.assigned = assigned
    this.picture = picture
    this.code = code
    this.invisibleFriend = invisibleFriend
    this.wishList = wishList
  }
}
