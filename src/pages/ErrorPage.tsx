import React, {FC} from 'react'
import classes from '../styles/pages/ErrorPage.module.css'

interface IError {
    message: string,
    backLink?: string,
}

const ErrorPage:FC<IError> = ({message, backLink}) => {
  return (
    <div className={classes.page}>
      <h1>Oops, something went wrong</h1>
      <h3 className={classes.message}>Error: {message}</h3>
      {backLink ? <a href={backLink}>Back to safe page</a> : <a href='/'>Back to safe page</a>}
    </div>
  )
}

export default ErrorPage