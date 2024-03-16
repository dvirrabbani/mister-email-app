import { IconButton } from '@mui/material';

export function AddonList() {
  const imgUrlList = [
    'https://www.gstatic.com/companion/icon_assets/calendar_2020q4_2x.png',
    'https://www.gstatic.com/companion/icon_assets/keep_2020q4v3_2x.png',
    'https://www.gstatic.com/companion/icon_assets/tasks_2021_2x.png',
    'https://www.gstatic.com/companion/icon_assets/contacts_2022_2x.png',
  ];
  return (
    <ul className="addon-list">
      {imgUrlList.map((imgUrl) => {
        return (
          <li className="addon-item" key={imgUrl}>
            <IconButton>
              <img src={imgUrl} />
            </IconButton>
          </li>
        );
      })}
    </ul>
  );
}
