type TBloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

enum EGender {
  MALE = 'male',
  FEMALE = 'female'
}

enum EColor {
  BROWN = 'Brown',
  AMBER = 'Amber',
  HAZEL = 'Hazel',
  GREEN = 'Green',
  BLUE = 'Blue',
  GRAY = 'Gray',
  OTHER = 'Other'
}

enum ETypeHair {
  STRAIGHT = 'Straight',
  WAVY = 'Wavy',
  CURLY = 'Curly',
  KINKY = 'Kinky'
}

enum ERole {
  ADMIN = 'admin',
  USER = 'user'
}

interface IHair {
  color: EColor,
  type: ETypeHair
}

interface ICoordinates {
  lat: number,
  lng: number
}

interface IAddress {
  address: string,
  city: string,
  state: string,
  stateCode: string,
  postalCode: string,
  coordinates: ICoordinates,
  country: string
}

interface IBank {
  cardExpire: string,
  cardNumber: string,
  cardType: string,
  currency: string,
  iban: string
}

interface ICrypto {
  coin: string,
  wallet: string,
  network: string
}


interface ICompany {
  department: string,
  name: string,
  title: string,
  address: IAddress
}


export interface IUser {
  id: number,
  firstName: string,
  lastName: string,
  maidenName: string,
  age: number,
  gender: EGender,
  email: string,
  phone: string,
  username: string,
  password: string,
  birthDate: string,
  image: string,
  bloodGroup: TBloodGroup,
  height: number,
  weight: number,
  eyeColor: EColor,
  hair: IHair,
  ip: string,
  address: IAddress,
  macAddress: string,
  university: string,
  bank: IBank,
  company: ICompany,
  ein: string,
  ssn: string,
  userAgent: string,
  crypto: ICrypto,
  role: ERole
}

