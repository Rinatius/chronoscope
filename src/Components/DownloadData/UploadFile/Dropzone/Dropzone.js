import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { parseCSV, parseEmbed } from "../../../../slices/initData";
import { useDispatch } from "react-redux";

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
	transition: 'border .24s ease-in-out'
  };
  

const Dropzone = (props) => {
	const dispatch = useDispatch()
	const onDrop = useCallback((acceptedFiles) => {
	  acceptedFiles.forEach((file) => {
		if (file.name.split('.').pop() === 'csv' || file.name.split('.').pop() === 'tsv') {
			// props.parseCsv(file)
			dispatch(parseCSV(file))
		}
		else if (file.name.split('.').pop() === 'npy') {
			dispatch(parseEmbed(file))
		}
	  })
	}, [])
	
	const {
		acceptedFiles, 
		getRootProps, 
		getInputProps, 
		open, 
	} = useDropzone({
		onDrop, 
		accept: '.csv, .tsv, .npy', 
		noClick: true,
		noKeyboard: true,
		multiple: true
	})

	const files = acceptedFiles.map(file => (
		<li key={file.name}>
			{file.name} - {file.size} bytes
		</li>
	));
	
	// console.log(files)
  
	return (
	<section className="container" >
	  <div {...getRootProps({style})}>
		<input {...getInputProps()} />
		<p>Drag 'n' drop some files here, or click to select files</p>
		<button type="button" onClick={open}>
          Open File Dialog
        </button>
	  </div>
	  <aside>
         <h4>Files</h4>
         <ul>{files}</ul>
       </aside>
	</section>
	)
  }

export default Dropzone