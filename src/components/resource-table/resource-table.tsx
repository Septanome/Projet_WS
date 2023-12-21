import { Sheet, Table } from "@mui/joy";
import React, { FC, useCallback } from "react";
import { RESOURCE_BASE_URL } from "../../constants/dbpedia";
import { Link } from "react-router-dom";

interface ResourceItem {
    label: string;
    value: string | string[];
    linkTo?: "character" | "location" | "external";
}

interface ResourceTableProps {
    resourceItems: ResourceItem[];
}

export const ResourceTable: FC<ResourceTableProps> = ({ resourceItems }) => {
    const filteredItems = useCallback(() => {
        return resourceItems.filter((item) =>
            Array.isArray(item.value)
                ? item.value.some((value) => value.length)
                : item.value.length,
        );
    }, [resourceItems]);

    const itemUrl = (resource: ResourceItem, value: string) => {
        return resource.linkTo === "character"
            ? `/character/${value.replace(RESOURCE_BASE_URL, "")}`
            : resource.linkTo === "location"
              ? `/location/${value.replace(RESOURCE_BASE_URL, "")}`
              : value;
    };

    const renderValue = (resource: ResourceItem) => {
        return Array.isArray(resource.value)
            ? resource.value.map((value) =>
                  value.startsWith(RESOURCE_BASE_URL) ? (
                      <Link
                          key={value}
                          to={itemUrl(resource, value)}
                          target={
                              resource.linkTo === undefined ||
                              resource.linkTo === "external"
                                  ? "blank"
                                  : undefined
                          }
                      >
                          {value.replace(RESOURCE_BASE_URL, "")}
                      </Link>
                  ) : (
                      <span key={value}>{value}</span>
                  ),
              )
            : resource.value;
    };

    return (
        <Sheet variant="outlined">
            <Table sx={{ "& td:nth-child(1)": { width: "150px" } }}>
                <tbody>
                    {filteredItems().map((resource) => (
                        <tr key={resource.label}>
                            <td>{resource.label}</td>
                            <td>
                                <div
                                    style={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        columnGap: 12,
                                    }}
                                >
                                    {renderValue(resource)}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Sheet>
    );
};
