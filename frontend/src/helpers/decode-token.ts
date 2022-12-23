import { verify } from 'jsonwebtoken'

type Props = {
  token: string
}

/**
 * A function that will decode the content associated in the token.
 *
 * @returns This will return the email/role associated on the token.
 */
const decodeToken = ({ token }: Props) => {
  try {
    const secret = process.env.NEXT_PUBLIC_AUTH_JWT_SECRET
    const decode: any = verify(token, `${secret}`)
    return decode
  } catch (error) {
    return undefined
  }
}

export default decodeToken
