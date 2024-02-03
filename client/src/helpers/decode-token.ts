import { decodeToken } from 'react-jwt'

type Props = {
  token: string
}

/**
 * A function that will decode the content associated in the token.
 *
 * @returns This will return the email/role associated on the token.
 */
const decodedToken = ({ token }: Props) => {
  try {
    const secret = process.env.NEXT_PUBLIC_AUTH_JWT_SECRET
    const decodedToken = decodeToken(token)
    console.log('secret', secret)
    console.log('token', token)
    console.log('decodedToken', decodedToken)

    return decodedToken
  } catch (error) {
    console.error(error)
    return undefined
  }
}

export default decodedToken
