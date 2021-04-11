import { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Artwork from "../src/pages/Artwork";
import Artworks from "../src/pages/Artworks";
import Bids from "../src/pages/Bids";
import CreateArtwork from "../src/pages/CreateArtwork";
import Creator from "../src/pages/Creator";
import Creators from "../src/pages/Creators";
import Home from "../src/pages/Home";
import Profile from "../src/pages/Profile";
import Settings from "../src/pages/Settings";
import Navbar from "../src/components/Navbar";
import Web3Provider from "./contexts/Web3Provider";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

function App() {
  return (
    <div style={{ overflow: "hidden" }}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Web3Provider>
          <Router>
            <Navbar />
            <Switch>
              <Route path="/artwork/:tokenId">
                <Artwork />
              </Route>
              <Route path="/artworks/:type">
                <Artworks />
              </Route>
              <Route path="/bids">
                <Bids />
              </Route>
              <Route path="/create">
                <CreateArtwork />
              </Route>
              <Route path="/creator/:id">
                <Creator />
              </Route>
              <Route path="/creators">
                <Creators />
              </Route>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/profile">
                <Profile />
              </Route>
              <Route path="/settings">
                <Settings />
              </Route>
            </Switch>
          </Router>
        </Web3Provider>
      </MuiPickersUtilsProvider>
    </div>
  );
}

export default App;
