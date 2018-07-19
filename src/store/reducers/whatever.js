import _ from 'lodash';
import { format } from 'date-fns';
import bigList from './bigListOfNotes.json';

const folders = [
    null,
    'uidFolder1',
    'uidFolder2',
    'uidFolder3',
    'uidFolder31',
    'uidFolder311',
    'uidFolder312',
    'uidFolder313',
    'uidFolder4',
    'uidFolder5',
];

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

console.log(randomDate(new Date(2012, 0, 1), new Date()));

const dateMin = new Date('2015-01-01');
const dateMax = new Date();

const newList = {};

bigList.forEach((note) => {
    const creation = randomDate(dateMin, dateMax);

    newList[note.uid] = {
        ...note,
        folderUid: _.sample(folders),
        createdAt: format(creation),
        updatedAt: format(randomDate(creation, dateMax)),
    };
});

console.log(JSON.stringify(newList));
