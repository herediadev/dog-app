import * as React from 'react';
import {create} from 'react-test-renderer';
import {CreateDogImage, IPropCreateDogImage} from "../CreateDogImage";
import {Card} from "antd";

describe("Given the CreateDogImage", () => {
    it("it will render 0 card", () => {
        const props: IPropCreateDogImage = {dogsImages: []};
        const reactTestRenderer = create(<CreateDogImage dogsImages={props.dogsImages}/>);
        const component = reactTestRenderer.root;

        expect(component.findAllByType(Card).length).toBe(0);
    });

    it("it will render 2 card", () => {
      const props: IPropCreateDogImage = {dogsImages: ["test_dog_card1", "test_dog_card2"]};
        const reactTestRenderer = create(<CreateDogImage dogsImages={props.dogsImages}/>);
        const component = reactTestRenderer.root;

        expect(component.findAllByType(Card).length).toBe(2);
    });

});
