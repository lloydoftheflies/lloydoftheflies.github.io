---
title: "Installing SimpleCV in a Virtual Environment"
date: 2019-06-13T10:25:24-04:00
categories: [software]
tags: [papap]
---

If you, like me, for reasons we don't need to go into, are trying to setup the python package [SimpleCV](https://pypi.org/project/SimpleCV/) inside a virtual environment on a late-2019 Ubuntu-ish development environment and having trouble, this may be helpful.

What ended up working for me was a variation of [this section in the simplecv README](https://github.com/sightmachine/simplecv#virtualenv), which I'll walk through here with a bit of context.

[SimpleCV](http://simplecv.org/), as it's name suggests, aims to provide a simpler interface to the popular [OpenCV](https://opencv.org/) library for [computer vision (CV)](https://en.wikipedia.org/wiki/Computer_vision) tasks. The project was last updated in 2015 (the pypi package in 2012), and uses the older `cv` interface for `opencv` (among other things, this earlier version uses OpenCV-specific objects, while the `cv2` interface uses `numpy` objects). `cv2` is supposedly a simpler and faster interface. In light of all that, I wouldn't recommend using SimpleCV for any new endeavors, but if you have some existing SimpleCV project that you'd like to get running again, hopefully this will be helpful for you.

Despite offering an allegedly simpler interface, SimpleCV still requires OpenCV as a dependency, involving it's somewhat notorious install process.

I eventually got SimpleCV installed and _isolated_ on my laptop by installing everything except OpenCV in a virtual environment and then linking to the `opencv` provided by the package manager on my machine.

First we need to install the system dependencies (on Ubuntu, `python-opencv` is the apt package, while `opencv-python` is the pip package).

```shell
sudo apt-get install python-opencv python-setuptools
```

This ended up installing `python-opencv` version 2.4.9 for me.

Then, we'll launch a python shell to get the installed location of the library and verify that it's compatible with SimpleCV:

```python
>>> import cv2
>>> # get the locations of cv2.so and cv.py
>>> cv2.__file__
/usr/lib/python2.7/dist-packages/cv2.x86_64-linux-gnu.so
>>> # make sure cv2 is an older version that supports the cv API
>>> # if the cv module exists, it supports the original API
>>> cv2.cv
<module 'cv2.cv' (built-in)>
```

With that done, we can link that OpenCV install to a virtualenv inside the project folder and install SimpleCV:

```shell
# create virtual environment
virtualenv venv
cd venv
ln -s /usr/lib/python2.7/dist-packages/cv2.x86_64-linux-gnu.so lib/python2.7/site-packages/cv2.so
ln -s /usr/lib/python2.7/dist-packages/cv.py lib/python2.7/site-packages/cv.py
# install remaining project depedencies
./bin/pip install -r ../requirements.txt
# install pygame and SimpleCV directly
mkdir src
wget -O src/pygame.tar.gz https://bitbucket.org/pygame/pygame/get/6625feb3fc7f.tar.gz
cd src
tar zxvf pygame.tar.gz
cd ..
./bin/python src/pygame-pygame-6625feb3fc7f/setup.py -setuptools install
./bin/pip install https://github.com/sightmachine/SimpleCV/zipball/develop
```

## Optional SimpleCV dependencies

If you want to use the SimpleCV interactive shell, you'll need a specific version of ipython.

As mentioned in the [IPython Custom Magics documentation](https://ipython.readthedocs.io/en/stable/config/custommagics.html):
> In early IPython versions 0.12 and before the line magics were created using a `define_magic()` API function. This API has been replaced with the above in IPython 0.13 and then completely removed in IPython 5. Maintainers of IPython extensions that still use the `define_magic()` function are advised to adjust their code for the current API.

So we just need to specify an early enough version of ipython:

```shell
pip install "ipython==0.12.*"
```

Good luck with your CV projects!
