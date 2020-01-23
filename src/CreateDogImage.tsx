import React from "react";
import {Card} from "antd";

export interface IPropCreateDogImage {
    dogsImages: string[];
}

export const CreateDogImage = (props: IPropCreateDogImage) => {
    return (<div className="row">
        {props.dogsImages.map((image) => (
            <div className="column" key={image}>
                <Card style={{width: 240, height: "100%", marginTop: "5px"}}
                      cover={<img alt={image} src={image}/>}>
                </Card>
            </div>
        ))}
    </div>);
};
