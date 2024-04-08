import { Badge, Box, Flex, Progress } from "@radix-ui/themes";

export default function Home() {
  return (
    <div className="">
    <div className="text-3xl mb-3">Sort your issues</div>
    <Flex gap="2">
      <Badge color="orange">In progress</Badge>
      <Badge color="blue">In review</Badge>
      <Badge color="green">Complete</Badge>
    </Flex>
    <div className="text-l mt-3">Create new issues, assign and update. Get ahead on your pending workflow</div>
    {/* <Box maxWidth="300px">
      <Progress />
    </Box> */}
    </div>
  )
}
