import { useState } from "react"
export default function player({initialname,symbol,isActive,onChangeName})
{
    const [playerName,setplayerName]=useState(initialname);
    const [isEditing,setisEditing]=useState(false);
    function clickhandler()
    {
        setisEditing((editing)=>!isEditing);
        if(isEditing)
            {
                onChangeName(symbol,playerName);
            }
    }
    function handlechange(event)
    {
        console.log(event);
        setplayerName(event.target.value);
    }
    let editablePlayerName=<span className="player-name">{playerName}</span>;
    if(isEditing)
        {
            editablePlayerName=<input type="text" required value={playerName} onChange={handlechange}/>
        }
    return (
        <li className={isActive?'active':undefined}>
        <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={clickhandler}>{isEditing?'save':'edit'}</button>
    </li>
    );
}