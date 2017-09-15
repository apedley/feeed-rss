import React from 'react'

import { Dropdown } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom';

  
export default function OptionsMenu(props) {
  const  signin = (e) => {
    debugger;
    return (
      <Redirect to="/signin" />
    )
  }

  const signInLink = (
    <Dropdown.Item icon='sign in'  as={ Link } to="/signin" text='Sign In'  />
  )

  const signOutLink = (
    <Dropdown.Item icon='sign out'  as={ Link } to="/signout" text='Sign Out'  />    
  )

  const addLinks = [
    <Dropdown.Item icon='add' text='Add Feed' />,
    <Dropdown.Item icon='add' text='Add Category' />
  ]
  
  return (
    <Dropdown icon="setting" floating button className='icon'>
        { props.authenticated ? (
          <Dropdown.Menu>
            <Dropdown.Item icon='add' text='Add Feed' />
            <Dropdown.Item icon='add' text='Add Category' />
            <Dropdown.Divider />
            <Dropdown.Item icon='sign out'  as={ Link } to="/signout" text='Sign Out'  />   
          </Dropdown.Menu>
        ) : (
          <Dropdown.Menu>
            <Dropdown.Item icon='sign in'  as={ Link } to="/signin" text='Sign In'  />
          </Dropdown.Menu>
        )}
    </Dropdown>
  )
}