<div className={'mainContainer'}>
  <Grid container spacing={3} className={classes.root}>
    {/* <div style={{ position: 'absolute', right: '10px', top: '1px' }}>
    <Switch
      checkedIcon={<Brightness5Icon fontSize="small" />}
      icon={<Brightness3Icon fontSize="small" />}
      checked={!darkMode}
      onChange={() => {
        setDarkMode(!darkMode);
      }}
      size="medium"
      color="default"
      inputProps={{ 'aria-label': 'checkbox with default color' }}
    />
  </div> */}

    <Grid item xs={1} className={classes.chartBox}>
      {/* <Chart
      data={mockData2}
      onFocus={onFocus}
      primaryCursor={primaryCursor}
      secondaryCursor={secondaryCursor}
      series={series}
      axes={axes}
      tooltip
      dark={darkMode}
    /> */}
    </Grid>
    <Grid item xs={6}>
      <Paper className={classes.paperDark}>
        x: {primaryCursorValue && primaryCursorValue.toString()}
      </Paper>
      <Paper className={classes.paperDark}>
        y: {secondaryCursorValue && secondaryCursorValue}
      </Paper>
    </Grid>
    <Grid item xs={6}>
      <Paper className={classes.paperDark}></Paper>
    </Grid>
    <Grid item xs={3} className={classes.paperDark}>
      {/* <img src={logo} className={`App-logo ${logoRotation}`} alt="logo" />
    <input {...getInputProps()} {...getRootProps()} />
    {isDragActive ? (
      <p>Drop the files here ...</p>
    ) : (
      <p>Drag 'n' drop your log file here, or click to select files</p>
    )} */}
    </Grid>
    <Grid item xs={3}>
      <Paper className={classes.paperDark}>
        {/* {logfiles.map((file) => {
        return file.name;
      })} */}
      </Paper>
    </Grid>
    <Grid item xs={3}>
      <Paper className={classes.paperDark}>xs=3</Paper>
    </Grid>
    <Grid item xs={3}>
      <Paper className={classes.paperDark}>xs=3</Paper>
    </Grid>
  </Grid>

  {/* {error && (
  <Snackbar open={true} autoHideDuration={6000}>
    <Alert severity="error">Wrong File Type. Upload CSV log file.</Alert>
  </Snackbar>
)} */}
</div>;
