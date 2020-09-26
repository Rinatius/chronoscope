import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

const style = {
	flex: 1,
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	paddingTop: '30px',
	paddingBottom: '30px',
	paddingLeft: 'auto',
	paddingRight: 'auto',
	borderWidth: 2,
	borderRadius: 2,
	borderColor: '#eeeeee',
	borderStyle: 'dashed',
	backgroundColor: '#fafafa',
	color: '#bdbdbd',
	outline: 'none',
	transition: 'border .24s ease-in-out',
  };
  

const Dropzone = (props) => {
	const onDrop = useCallback((acceptedFiles) => {
	  acceptedFiles.forEach((file) => {
		props.handleChange(file)
		props.handleClick()
		let reader = new FileReader();
		reader.onloadend = () => {
			props.setImage(reader.result)
		}
		reader.readAsDataURL(file)
	  })
	}, [])
	
	const {
		acceptedFiles, 
		getRootProps, 
		getInputProps, 
		open, 
	} = useDropzone({
		onDrop, 
		noClick: true,
		noKeyboard: true,
		multiple: true
	})

	// const files = acceptedFiles.map(file => (
	// 	<li key={file.name}>
	// 		{file.name} - {file.size} bytes
	// 	</li>
	// ));
	
	// console.log(files)
  
	return (
	<section className="container" style={{width: '100%'}}>
	  <div {...getRootProps({style})}>
		<input {...getInputProps()} />
		<p>Drag 'n' drop some files here, or click to select files</p>
		<button type="button" onClick={open}>
          Open File Dialog
        </button>
	  </div>
	</section>
	)
  }

export default Dropzone