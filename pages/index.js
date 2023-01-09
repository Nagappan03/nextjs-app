import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";

function HomePage(props) {
    return <MeetupList meetups={props.meetups} />
}

export async function getStaticProps() {
    const client = await MongoClient.connect('mongodb+srv://mernapp:q2HFO8degzxHGdL2@cluster0.ef3u1ti.mongodb.net/?retryWrites=true&w=majority');
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const meetups = await meetupsCollection.find().toArray();
    client.close();

    return {
        props: {
            meetups: meetups.map((meetup) => ({
                title: meetup.title,
                image: meetup.image,
                address: meetup.address,
                description: meetup.description
            }))
        },
        revalidate: 10
    };
}

export default HomePage;