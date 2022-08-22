import React, {useEffect, useState} from 'react';
import {ThemeProvider} from 'styled-components';
import Video from '../Video';
import Playlist from './Playlist';
import StyledPlayer from '../styles/StyledPlayer';
import videos from '../../Videos';
import {getCourses} from "../../apis/courseApi";
import {getVideos} from "../../apis/videosApi";

const theme = {
	bgcolor: "#353535",
	bgcolorItem: "#414141",
	bgcolorItemActive: "#405c63",
	bgcolorPlayed: "#526d4e",
	border: "none",
	borderPlayed: "none",
	color: "#fff",
};

const themeLight = {
	bgcolor: "#fff",
	bgcolorItem: "#fff",
	bgcolorItemActive: "#80a7b1",
	bgcolorPlayed: "#7d9979",
	border: "1px solid #353535",
	borderPlayed: "none",
	color: "#353535",
};

/**
 *
 * @param match     React Router: A match object contains information about how a <Route path> matched the URL
 * @param history   React Router: A history object to use for navigation.
 * @param location
 * @returns {*}
 * @constructor
 */
const Player = ({match, history, location}) => {
	//to avoid infinite loop :
	//declare a second argument : the dependency array
	//to tell useEffect when rerun
	//empty array means we want this to run once


	// const savedState = JSON.parse(localStorage.getItem(`${courses.playlistId}`));
	const savedState = false;

	// localStorage.clear();
	//
	const [state, setState] = useState({
		coursesList: savedState ? savedState.coursesList : [],
		selectedCourse: savedState ? savedState.selectedCourse : {},
		courseVideos: savedState ? savedState.courseVideos : [],
		videos: savedState ? savedState.videos : videos.playlist,
		activeVideo: savedState ? savedState.activeVideo : videos.playlist[0],
		nightMode: savedState ? savedState.nightMode : true,
		playlistId: savedState ? savedState.playlistId : videos.playlistId,
		autoplay: false,
	});

	useEffect(() => {
		let oldState = state;
		getCourses().then((_courses) => {
			oldState.coursesList = _courses;
			oldState.selectedCourse = _courses[0];
			getVideos(state.selectedCourse).then((_videos) => {
				oldState.courseVideos = _videos;
			});
			return setState(oldState)
		});

	}, [state]);
	console.log(state);
	// useEffect(() => {
	// 	localStorage.setItem(`${state.playlistId}`, JSON.stringify({...state}));
	// }, [state]);

	// useEffect(() => {
	// 	const videoId = match.params.activeVideo;
	// 	if (videoId !== undefined) {
	// 		const newActiveVideo = state.courses.findIndex(
	// 			(video) => video.id === videoId
	// 		);
	//
	// 		setState((prev) => ({
	// 			...prev,
	// 			activeVideo: prev.courses[newActiveVideo],
	// 			autoplay: location.autoplay,
	// 		}));
	// 	} else {
	// 		history.push({
	// 			pathname: `/${state.activeVideo.id}`,
	// 			autoplay: false,
	// 		});
	// 	}
	// }, [
	// 	history,
	// 	location.autoplay,
	// 	match.params.activeVideo,
	// 	state.activeVideo.id,
	// 	state.courses,
	// ]);

	// const nightModeCallback = () => {
	// 	setState((prevState) => ({
	// 		...prevState,
	// 		nightMode: !prevState.nightMode,
	// 	}));
	// };
	//
	// const endCallback = () => {
	// 	const videoId = match.params.activeVideo;
	// 	const currentVideoIndex = state.courses.findIndex(
	// 		(video) => video.id === videoId
	// 	);
	// 	const nextVideo =
	// 		currentVideoIndex === state.courses.length - 1 ? 0 : currentVideoIndex + 1;
	//
	// 	history.push({
	// 		pathname: `/${state.courses[nextVideo].id}`,
	// 		autoplay: false,
	// 	});
	// };
	//
	// const progressCallback = (e) => {
	// 	if (e["playedSeconds"] > 10 && e["playedSeconds"] < 11) {
	// 		const courses = [...state.courses];
	// 		const playedVideo = courses.find(
	// 			(video) => video.id === state.activeVideo.id
	// 		);
	// 		playedVideo.played = true;
	//
	// 		setState((prevState) => ({...prevState, courses}));
	// 	}
	// };

	return (
		<ThemeProvider theme={state.nightMode ? theme : themeLight}>
			{state.videos !== null ? (
				<StyledPlayer>
					<Video
						active={state.activeVideo}
						autoplay={state.autoplay}
						// endCallback={endCallback}
						// progressCallback={progressCallback}
					/>
					<Playlist
						videos={state.videos}
						active={state.activeVideo}
						// nightModeCallback={nightModeCallback}
						// nightMode={state.nightMode}
					/>
				</StyledPlayer>
			) : null}
		</ThemeProvider>
	);
};

export default Player;