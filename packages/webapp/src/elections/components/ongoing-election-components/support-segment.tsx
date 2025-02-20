import React from "react";
import { GoSync } from "react-icons/go";

import { MemberStatus, useCurrentMember } from "_app";
import { ROUTES } from "_app/routes";
import { Button, Container, Expander, OpensInNewTabIcon, Text } from "_app/ui";
import { ElectionCommunityRoomButton } from "elections";

export const SupportSegment = () => {
    const { data: currentMember } = useCurrentMember();
    const isActiveMember = currentMember?.status === MemberStatus.ActiveMember;

    return (
        <Expander
            type="info"
            header={
                <div className="flex justify-center items-center space-x-2">
                    <GoSync size={24} className="text-gray-400" />
                    <Text className="font-semibold">
                        Community room &amp; live results
                    </Text>
                </div>
            }
        >
            {!isActiveMember && (
                <Container>
                    <Text>
                        Sign in with your EOS Respect member account to access the
                        community room.
                    </Text>
                </Container>
            )}
            <Container className="flex justify-between sm:justify-start items-center space-x-4">
                <ElectionCommunityRoomButton />
                <Button
                    type="link"
                    href={ROUTES.ELECTION_STATS.href}
                    target="_blank"
                >
                    Live results <OpensInNewTabIcon />
                </Button>
            </Container>
        </Expander>
    );
};

export default SupportSegment;
