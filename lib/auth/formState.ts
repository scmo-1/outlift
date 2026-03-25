export type SignupFormState = {
  error: string | null
  fieldErrors: {
    username?: string
    email?: string
    password?: string
    confirmPassword?: string
  }
  values: {
    username: string
    email: string
  }
}

export type LoginFormState = {
  error: string | null
  values: {
    email: string
  }
}

export const initialLoginFormState: LoginFormState = {
  error: null,
  values: {
    email: '',
  },
}

export const initialSignupFormState: SignupFormState = {
  error: null,
  fieldErrors: {},
  values: {
    username: '',
    email: '',
  },
}
