import pandas as pd
from dataclasses import dataclass

@dataclass
class Example:
    _type: str
    data: pd.dataFrame


def get_example(df, example_type, **kwargs):
    if example_type == "head":
        return Example("head", df.head(**kwargs))
    elif example_type == "tail":
        return Example("tail", df.tail(**kwargs))
    elif example_type == "sample":
        return Example("sample", df.sample(**kwargs))



