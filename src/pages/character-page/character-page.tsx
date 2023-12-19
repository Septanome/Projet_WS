import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CharacterRequest } from "../../models/request/character-request";
import "./character-page.scss";
import { CharacterResult } from "../../models/request/search";

export const CharacterPage: FC = () => {
    const [characterResult, setCharacterResult] = useState<CharacterResult>();
    const [searchError, setSearchError] = useState<string | null>(null);

    const { characterName: encodedCharacterName } = useParams<{
        characterName: string;
    }>();

    useEffect(() => {
        const characterName = decodeURIComponent(encodedCharacterName || "");

        const characterRequest = new CharacterRequest(characterName);

        characterRequest
            .execute()
            .then((results) => {
                setCharacterResult(results);
            })
            .catch((error) => {
                setSearchError(String(error));
                console.error(error);
                setCharacterResult(undefined);
            });
    }, []);

    return (
        <div className="Character-page">
            {characterResult && (
                <>
                    {characterResult.abstract}
                    {characterResult.thumbnail}
                    {characterResult.abode}
                    {characterResult.label}
                    {characterResult.consort}
                    {characterResult.godOf}
                    {characterResult.parents}
                    {characterResult.planet}
                    {characterResult.siblings}
                    {characterResult.symbol}
                </>
            )}
        </div>
    );
};
