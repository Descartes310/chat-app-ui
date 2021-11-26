import Avatar from "@material-ui/core/Avatar";
import { getFilePath } from '../helpers/helpers';

const UserAvatar = ({avatar = null, name = null, width = '40', height = '40'}) => {

    let _avatar, _name;
    if (avatar)
        _avatar = avatar;

    if (name)
        _name = name;
    else _name = 'a';

    return (
        <>
            {(_avatar && _avatar !== '') ?
                <img onClick={() => window.open(getFilePath(_avatar), '_blank')} src={getFilePath(_avatar)} alt="mail user" className={"rounded-circle mr-15 align-self-center"} width={width} height={height} />
                : <Avatar className={"mr-15 align-self-center"}>{_name.charAt(0)}</Avatar>
            }
        </>
    );
};

export default UserAvatar;