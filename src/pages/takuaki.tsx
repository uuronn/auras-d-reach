import Logout from "~/components/Logout"
import Online from "~/components/Online"
import { PlayerName } from "~/components/PlayerName"
import Room from "~/components/Room"

function Takuaki() {
  return (
    <div>
        <div>takuaki</div>
        <Room personNumbers={1} roomNumber={1}/>
        <PlayerName playerName="takuaki"/>
        <Online onlineNumber={1}/>
        <Logout/>
    </div>
    
  )
}

export default Takuaki