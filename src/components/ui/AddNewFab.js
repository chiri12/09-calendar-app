import React from 'react'
import { useDispatch } from 'react-redux'
import { uiOpenModal } from '../../actions/ui';

// un funcional component solo para el boton  del mas 
export const AddNewFab = () => {

    const dispatch =  useDispatch();

    const handleClickNew = () => {
        dispatch( uiOpenModal() );
    }

  return (
    <button 
        className='btn btn-primary fab'
        onClick={ handleClickNew }

    >
        <i className='fas fa-plus'></i>
        {
            //icono de awsomware para mas 
        }
        
    </button>
  )
}
