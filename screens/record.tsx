import React from "react";
import { Button } from "react-native";
import styled from "styled-components/native";
import H2 from "../components/text/h2";
import { RootTabScreenProps } from "../types";
import { Audio } from "expo-av";
import { RecordingOptions } from "expo-av/build/Audio";

const recordingOptions: RecordingOptions = {
  android: {
    extension: ".m4a",
    outputFormat: 0,
    audioEncoder: 0,
    sampleRate: 44100,
    numberOfChannels: 2,
    bitRate: 128000,
  },
  ios: {
    extension: ".caf",
    audioQuality: 127,
    sampleRate: 44100,
    numberOfChannels: 2,
    bitRate: 128000,
    linearPCMBitDepth: 16,
    linearPCMIsBigEndian: false,
    linearPCMIsFloat: false,
  },
};

interface Props extends RootTabScreenProps<any> {}

const Record = (props: Props) => {
  const { navigation } = props;

  const [recording, setRecording] = React.useState<any>();
  const [path, setPath] = React.useState("");

  const startRecording = async () => {
    try {
      console.log("Requesting permissions..");
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      console.log("Starting recording..");
      const { recording, status } = await Audio.Recording.createAsync(recordingOptions);
      setRecording(recording);
      console.log(status.durationMillis);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  const stopRecording = async () => {
    console.log("Stopping recording..");
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    console.log("Recording stopped and stored at", uri);
    
  };

  return (
    <StyledView>
      <H2>hi</H2>
      <Button title="dismiss" onPress={() => navigation.goBack()} />
      <Button title="start" onPress={() => startRecording()} />
      <Button title="stop" onPress={() => stopRecording()} />
    </StyledView>
  );
};
export default Record;

const StyledView = styled.View`
  background-color: #fff;
  flex: 1;
`;
