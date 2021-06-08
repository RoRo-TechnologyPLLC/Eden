import { useMemberByAccountName } from "_app";
import * as InductionTable from "_app/ui/table";

import { getInductionRemainingTimeDays } from "../../utils";
import { Induction, InductionRole } from "../../interfaces";
import { InductionStatusButton } from "./induction-status-button";
import { EndorsersNames } from "./endorsers-names";

interface Props {
    inductions: Induction[];
}

export const InviteeInductions = ({ inductions }: Props) => (
    <InductionTable.Table
        columns={INVITEE_INDUCTION_COLUMNS}
        data={getTableData(inductions)}
        tableHeader="My invitations to Eden"
    />
);

const INVITEE_INDUCTION_COLUMNS: InductionTable.Column[] = [
    {
        key: "inviter",
        label: "Inviter",
    },
    {
        key: "witnesses",
        label: "Witnesses",
        className: "hidden md:flex",
    },
    {
        key: "time_remaining",
        label: "Time remaining",
        className: "hidden md:flex",
    },
    {
        key: "status",
        label: "Action/Status",
        type: InductionTable.DataTypeEnum.Action,
    },
];

const getTableData = (inductions: Induction[]): InductionTable.Row[] => {
    return inductions.map((induction) => {
        const { data: inviter } = useMemberByAccountName(induction.inviter);
        const remainingTime = getInductionRemainingTimeDays(induction);

        return {
            key: induction.id,
            inviter: inviter ? inviter.name : induction.inviter,
            witnesses: (
                <EndorsersNames
                    induction={induction}
                    skipEndorser={induction.inviter}
                />
            ),
            time_remaining: remainingTime,
            status: (
                <InductionStatusButton
                    induction={induction}
                    role={InductionRole.Invitee}
                />
            ),
        };
    });
};
