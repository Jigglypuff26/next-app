import { LogoIcon } from '@/assets/icons'
import { COMPANY } from '@/config/company'
import { Box, Divider, Typography } from '@mui/material'
import { NextPage } from 'next'
import Image from 'next/image'
import classes from './header.module.css';

type HeaderProps = {
    variant?: "default" | "user" | "admin"
}

const Header: NextPage<HeaderProps> = (props) => {
    const { variant = 'default' } = props;

    return (
        <Box className={classes.wrapper} >
            <header className={classes.header_wrapper}>
                <Box className={classes.logo_wrapper}>
                    <Image
                        src={LogoIcon}
                        width={28}
                        height={28}
                        alt="ImageLogo"
                    />
                    <Typography>{COMPANY.name}</Typography>
                </Box>
                <Box>Links {variant}</Box>
            </header>
        </Box>
    );
}

export default Header;
