import { fireEvent, render, waitFor } from '@testing-library/react'
import React from 'react'

import Input from '../../components/Input'

jest.mock('@unform/core', () => {
  return {
    useField() {
      return {
        fieldName: 'email',
        defaultValue: '',
        error: '',
        registerField: jest.fn()
      }
    }
  }
})

describe('Input component', () => {
  it('should be able to render an input', () => {
    const { getAllByPlaceholderText } = render(
      <Input name="email"  placeholder="E-mail" />
    )

    expect(getAllByPlaceholderText('E-mail')).toBeTruthy()
  })

  it('should render highlight on input focus', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email"  placeholder="E-mail" />
    )

    const inputElement = getByPlaceholderText('E-mail')
    const inputContainer = getByTestId('input-container')

    fireEvent.focus(inputElement)

    await waitFor(()  => {
      expect(inputContainer).toHaveStyle('border-color: #ff9000')
      expect(inputContainer).toHaveStyle('color: #ff9000')
    })

    fireEvent.blur(inputElement)

    await waitFor(()  => {
      expect(inputContainer).not.toHaveStyle('border-color: #ff9000')
      expect(inputContainer).not.toHaveStyle('color: #ff9000')
    })
  })

  it('should keep border highlight when input field', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email"  placeholder="E-mail" />
    )

    const inputElement = getByPlaceholderText('E-mail')
    const inputContainer = getByTestId('input-container')
    
    fireEvent.change(inputElement, {
      target: { value: 'johndoe@example.com' }
    })

    fireEvent.blur(inputElement)

    await waitFor(()  => {
      expect(inputContainer).toHaveStyle('color: #ff9000')
    })
  })
})