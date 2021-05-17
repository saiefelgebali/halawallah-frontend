import React, { useEffect, useRef, useState } from "react";
import styles from "./ImageCanvas.module.scss";
import SliderStyles from "./Slider.module.scss";
import ImageEditor from "./ImageEditor";

function ImageCanvas() {
	const canvas = useRef();
	const slider = useRef();
	const container = useRef();
	const [active, setActive] = useState(false);
	const [editor, setEditor] = useState(null);

	useEffect(() => {
		if (!canvas.current) return;

		// Set canvas width to fill container
		canvas.current.width = container.current.offsetWidth;

		// Setup editor with canvas on load
		setEditor(new ImageEditor(canvas.current));
	}, []);

	function handleImageChange(event) {
		// Handle image input
		const files = event.target.files;

		// Validate file input
		if (!files || !files.length) {
			return;
		}

		const targetFile = files[0];

		// Load image onto image editor
		editor.loadImageFile(targetFile);

		setActive(true);

		// Reset slider
		slider.current.value = 0;
	}

	function handleSliderInput(event) {
		// Zoom image on change slider input
		const zoom = event.target.value;
		editor.zoomImage(zoom);
	}

	return (
		<div className={styles.container} ref={container}>
			<input
				id={styles.imgInput}
				type='file'
				accept='.png, .jpg'
				onChange={handleImageChange}
			/>
			{active ? (
				<label htmlFor={styles.imgInput} className={styles.active}>
					Change Image
				</label>
			) : (
				<label htmlFor={styles.imgInput}>Select Image</label>
			)}
			<canvas id={styles.canvas} ref={canvas} height={0}></canvas>

			<div id={styles.slider} className={active ? styles.active : null}>
				<label htmlFor={styles.slider}>Zoom</label>
				<input
					ref={slider}
					type='range'
					defaultValue={0}
					className={SliderStyles.slider}
					onInput={handleSliderInput}
				/>
			</div>
		</div>
	);
}

export default ImageCanvas;
