import React, { useState, useEffect, useCallback, useRef } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './BoardCard.css';

const ExpandMore = styled((props) => {
	const { expand, ...other } = props;
	return <IconButton {...other} />;
})(({ theme, expand }) => ({
	transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
	marginLeft: 'auto',
	transition: theme.transitions.create('transform', {
		duration: theme.transitions.duration.shortest,
	}),
}));

export default function BoardCard(props) {
	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};
	const [board, setBoard] = useState(props.item);
	useEffect(() => {}, []);

	return (
		<Card className="card" sx={{ maxWidth: 345, width: 345 }}>
			<CardHeader
				avatar={
					<Avatar aria-label="recipe" src={board.profileImg}>
						사진
					</Avatar>
				}
				action={
					<IconButton aria-label="settings">
						<MoreVertIcon />
					</IconButton>
				}
				title={board.nickname}
				subheader="2022-04-13"
			/>
			{/* boardImgPath */}
			{board.boardImgPath ? (
				<CardMedia
					component="img"
					width={'300px'}
					height={'300px'}
					src={board.boardImgPath}
				/>
			) : (
				<CardMedia
					component="img"
					width={'300px'}
					height={'300px'}
					src={'/monkey_2.png'}
					alt="douzone monkey"
				/>
			)}

			<CardContent>
				<Typography
					variant="body2"
					color="text.secondary"
					style={{ fontFamily: 'BMDOHYEON' }}
				>
					{board.title}
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				<FavoriteIcon sx={{ color: red[500] }} />
				<div>좋아요수</div>
				{/* <IconButton aria-label="add to favorites">
					
				</IconButton> */}
				{/* <IconButton aria-label="share">
					<ShareIcon />
				</IconButton> */}
				<ExpandMore
					expand={expanded}
					onClick={handleExpandClick}
					aria-expanded={expanded}
					aria-label="show more"
				>
					<ExpandMoreIcon />
				</ExpandMore>
			</CardActions>
			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<CardContent>
					<Typography paragraph style={{ fontFamily: 'BMDOHYEON' }}>
						{board.subtitle ? board.subtitle : '부제목이 없네용'}
					</Typography>
				</CardContent>
			</Collapse>
		</Card>
	);
}
