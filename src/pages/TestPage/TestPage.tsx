import SnackbarComponent from '../../components/Global/SnackbarComponent/SnackbarComponent';
import { useState } from 'react';
import TooltipComponent from '../../components/Global/TooltipComponent/TooltipComponent';
import PoolCard from '../../components/Global/PoolCard/PoolCard';
import Stats from '../../components/Home/Stats/AmbientStats';
import Carousel, { CarouselItem } from '../../components/Global/Carousel/Carousel';

export default function TestPage() {
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

    return (
        <main>
            <button onClick={() => setOpenSnackbar(true)}>open me</button>
            <h3>This is TestPage.tsx</h3>
            <SnackbarComponent
                severity='success'
                setOpenSnackbar={setOpenSnackbar}
                openSnackbar={openSnackbar}
            >
                I am snackbar
            </SnackbarComponent>
            <TooltipComponent title='Snackbar title' />
            <PoolCard />
            <Stats />
            <Carousel>
                <CarouselItem>1</CarouselItem>
                <CarouselItem>1</CarouselItem>
                <CarouselItem>1</CarouselItem>
            </Carousel>
        </main>
    );
}
