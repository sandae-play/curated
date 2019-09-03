import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { Project } from "../../model-contracts/project";
import Container from "@material-ui/core/Container";
import {TimerComponent} from "../../components/timer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      backgroundColor: theme.palette.background.paper
    }
  })
);

export type ProjectViewComponentProps = {
  project: Project;
};

export function ProjectViewComponent({ project }: ProjectViewComponentProps) {
  const classes = useStyles();

  return (
    <Container maxWidth="xs" className={classes.root}>
      <h1>{project.name}</h1>

        <TimerComponent initialValue={20} maxValue={120} label="Pause"/>

    </Container>
  );
}

/*
<Fab style={{ textAlign: 'center'}}>
    <PlayArrow/>
</Fab>

 */
