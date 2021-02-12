import { gql, useMutation } from "@apollo/client";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory, useLocation } from "react-router-dom";
import { deleteEpisode, deleteEpisodeVariables } from "../__generated__/deleteEpisode";



export const DELETE_EPISODE = gql`
    mutation deleteEpisode($input: DeleteEpisodeInput!){
        deleteEpisode(input: $input) {
            ok
            error
        }
    }
`

interface IDeleteEpisdoeProps {
    podcastId: number;
    episodeId: number;
}

export const DeleteEpisodeBtn: React.FC<IDeleteEpisdoeProps> = ({podcastId, episodeId}) => {
    const location = useLocation();
    const history = useHistory();
    const onCompleted = (data: deleteEpisode) => {
        const {
            deleteEpisode: {
                ok
            }
        } = data;
        if (ok) {
            alert('Successfully delete the podcast 👊');
            window.location.reload()
        }
    }
    const [deleteEpisode, {data, loading, error}] = useMutation<deleteEpisode, deleteEpisodeVariables>(DELETE_EPISODE, {
        onCompleted,
    })
    const onClicked = async() => {
        if (!loading) {
            await deleteEpisode({
                variables: {
                    input: {
                        podcastId,
                        episodeId
                    }
                }
            })
        }
    }
    return (
        <div>
            <button onClick={onClicked} className="focus:outline-none">
                <FontAwesomeIcon icon={faTrash} />
            </button>
        </div>
    )
}