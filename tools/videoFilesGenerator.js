const {getVideoDurationInSeconds} = require('get-video-duration');
//requiring path and fs modules
const path = require('path');
const fs = require('fs');
const {promisify} = require('util');

const dbPath = path.join(__dirname, 'db.json');

const coursesPath = path.join(__dirname, '..', 'public', 'courses');

async function listDir(path) {
	try {
		return fs.promises.readdir(path);
	} catch (err) {
		console.error('Error occured while reading directory!', err);
	}
}

async function readFile(path) {
	try {
		return fs.promises.readFile(path);
	} catch (err) {
		console.error('Error occured while reading directory!', err);
	}
}
function formatNumber(n) {
	return n > 9 ? "" + n: "0" + n;
}
async function getVideoDuration(path) {
	const duration = await getVideoDurationInSeconds(path).then(v => v);
	let minutes = formatNumber(Math.floor(duration / 60));
	let seconds = formatNumber(Math.floor(duration % 60));
	return (minutes + ':' + seconds);
}


//TODO : OUSSAMA
const getCourseVideos = async (courseSlug) => {
	const courseDir = path.join(coursesPath, courseSlug);
	const videosList = await listDir(courseDir);
	return Promise.all(videosList.map(async (fileName) => {
		const duration = await getVideoDuration(courseDir + '/' + fileName);
		return {
			title: fileName,
			slug: fileName,
			duration,
		};
	}));
};



const getDb = async (path = dbPath) => {
	const file = await readFile(path);
	return JSON.parse(file);
};

async function generateJSON(){
	const db = await getDb();
	const courseVideos = await getCourseVideos('mosh');
	// console.log(courseVideos);
	db.courses.push({
		id: 1,
		title: 'React with mosh',
		slug: 'react-with-mosh',
		authorId: 1,
		category: 'JavaScript',
		liked: true,
		description: 'Course for react',
		path: '/mosh/',
		videos: courseVideos

	});
	const jsonData = JSON.stringify(db);
	console.log(jsonData);
	console.log(fs.writeFileSync(dbPath, jsonData));
}
generateJSON();



// let student = {
// 	name: 'Mike',
// 	age: 23,
// 	gender: 'Male',
// 	department: 'English',
// 	car: 'Honda'
// };
//
// let data = JSON.stringify(student);
// fs.writeFileSync('./student-2.json', data);
// // console.log(directoryPath);
