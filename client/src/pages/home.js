import "./home.css"
import HeroBanner from "../components/heroBanner";
import TweetList from "../components/tweetList";
import tweetsData from '../tweets/tweets.json';

const Home = () => {
    return (
        <div className="">
           <HeroBanner />
            <TweetList tweets={tweetsData}/>
        </div>
    );
}

export default Home;