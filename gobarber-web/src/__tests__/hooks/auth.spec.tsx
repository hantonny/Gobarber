import { renderHook } from '@testing-library/react-hooks';
import { AuthProvider, useAuth } from '../../hooks/auth';

describe('Auth hooks', () => {
  it('should be able to sign in', () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    result.current.signIn({
      email: 'coisa@gmail.com',
      password: '123456789'
    })

    expect(result.current.user.email).toEqual('coisa@gmail.com')
  })
})
