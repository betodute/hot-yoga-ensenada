import React from 'react'
import { useParams } from 'react-router-dom';

export const VerifyEmail = () => {
  const { token } = useParams();
  console.log(token);

  return (
    <div>Verifing Email at this {token} </div>
  )
}
