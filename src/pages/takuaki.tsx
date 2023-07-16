import Loading from "~/components/Loading"
import Logout from "~/components/Logout"
import OnlineCounter from "~/components/Online"
import { PlayerName } from "~/components/PlayerName"
import Room from "~/components/Room"

function Takuaki() {
  return (
    <div>
        <div>takuaki</div>
        <Room personNumbers={5} roomNumber={1}/>
        <PlayerName playerName="takuaki" isAnswer={true}/>
        <OnlineCounter onlineNumber={2}/>
        <Logout/>
        <Loading/>
    </div>
    
  )
}

export default Takuaki