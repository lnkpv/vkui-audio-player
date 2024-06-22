import AudioPlayer from './components/AudioPlayer/AudioPlayer';
import * as React from 'react';
import {
    AppRoot,
    SplitLayout,
    SplitCol,
    View,
    Panel,
    PanelHeader,
    Header,
    Group
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';


const App = () => {
    return (
        <AppRoot>
            <SplitLayout center={true}>
                <SplitCol width="100%" maxWidth="360px" autoSpaced>
                    <View activePanel="main">
                        <Panel id="main">
                            <PanelHeader>VKUI</PanelHeader>
                            <Group header={<Header mode="secondary">Tracks</Header>}>
                                <AudioPlayer/>
                            </Group>
                        </Panel>
                    </View>
                </SplitCol>
            </SplitLayout>
        </AppRoot>
    );
};

export default App;
