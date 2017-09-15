import React from 'react'

import { Dropdown } from 'semantic-ui-react'
import {  Link } from 'react-router-dom';

  
export default function OptionsMenu(props) {


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